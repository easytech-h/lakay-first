"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface BankAccount {
  id: string;
  institution: string;
  account_name: string;
  last_four: string;
  type: string;
  balance: number;
  status: "active" | "inactive";
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function BkCashAccountsSection() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ institution: "", account_name: "", last_four: "", type: "checking", balance: "" });

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from("bk_bank_accounts").select("*").eq("user_id", user.id).order("created_at");
    setAccounts(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!user || !form.institution || !form.account_name) return;
    setSaving(true);
    await supabase.from("bk_bank_accounts").insert({
      user_id: user.id,
      institution: form.institution,
      account_name: form.account_name,
      last_four: form.last_four,
      type: form.type,
      balance: parseFloat(form.balance) || 0,
      status: "active",
    });
    setSaving(false);
    setShowModal(false);
    setForm({ institution: "", account_name: "", last_four: "", type: "checking", balance: "" });
    load();
  };

  const totalCash = accounts.filter((a) => a.status === "active").reduce((s, a) => s + a.balance, 0);
  const connected = accounts.filter((a) => a.status === "active").length;
  const avgSpend = accounts.length > 0 ? totalCash / Math.max(accounts.length, 1) : 0;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#111111]">Accounts</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="h-9 px-4 bg-[#111111] hover:bg-[#111111]/90 text-[#FACC15] text-sm font-semibold rounded-lg gap-2"
        >
          <Plus className="h-4 w-4" />
          Connect account
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Cash", value: fmt(totalCash), color: "text-[#16A34A]" },
          { label: "Accounts Connected", value: connected.toString(), color: "text-[#111111]" },
          { label: "Avg Monthly Spend", value: fmt(avgSpend), color: "text-[#DC2626]" },
        ].map((m) => (
          <div key={m.label} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-1">{m.label}</p>
            <p className={cn("text-2xl font-bold", m.color)}>{m.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
      ) : accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[#E5E7EB] rounded-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF9C3] flex items-center justify-center mb-4">
            <Landmark className="h-7 w-7 text-[#FACC15]" />
          </div>
          <p className="text-[#6B7280] text-sm mb-3">No bank accounts connected yet.</p>
          <Button onClick={() => setShowModal(true)} className="h-9 px-4 bg-[#111111] text-[#FACC15] text-sm font-semibold rounded-lg">Connect your first account</Button>
        </div>
      ) : (
        <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                {["Account", "Institution", "Type", "Status", "Balance"].map((h) => (
                  <th key={h} className={cn("px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]", h === "Balance" ? "text-right" : "text-left")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-b border-[#F3F4F6] hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#111111]">{a.account_name}</span>
                    {a.last_four && <span className="text-[#9CA3AF] ml-1">···{a.last_four}</span>}
                  </td>
                  <td className="px-4 py-3 text-[#6B7280]">{a.institution}</td>
                  <td className="px-4 py-3 capitalize text-[#6B7280]">{a.type}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", a.status === "active" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F3F4F6] text-[#374151]")}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  </td>
                  <td className={cn("px-4 py-3 text-right font-semibold", a.balance >= 0 ? "text-[#16A34A]" : "text-[#DC2626]")}>{fmt(a.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#111111] text-lg">Connect Account</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-[#F3F4F6]"><X className="h-4 w-4 text-[#6B7280]" /></button>
            </div>
            <p className="text-xs text-[#6B7280]">Manual entry — Plaid integration coming soon.</p>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">Institution</label>
              <Input value={form.institution} onChange={(e) => setForm(f => ({ ...f, institution: e.target.value }))} className="h-9 text-sm border-[#E5E7EB] focus:border-[#FACC15]" placeholder="e.g. Chase, Bank of America" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">Account Name</label>
              <Input value={form.account_name} onChange={(e) => setForm(f => ({ ...f, account_name: e.target.value }))} className="h-9 text-sm border-[#E5E7EB] focus:border-[#FACC15]" placeholder="e.g. Business Checking" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Last 4 digits</label>
                <Input maxLength={4} value={form.last_four} onChange={(e) => setForm(f => ({ ...f, last_four: e.target.value }))} className="h-9 text-sm border-[#E5E7EB] focus:border-[#FACC15]" placeholder="1234" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Type</label>
                <Select value={form.type} onValueChange={(v) => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger className="h-9 text-sm border-[#E5E7EB]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">Current Balance</label>
              <Input type="number" value={form.balance} onChange={(e) => setForm(f => ({ ...f, balance: e.target.value }))} className="h-9 text-sm border-[#E5E7EB] focus:border-[#FACC15]" placeholder="0.00" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-9 border-[#E5E7EB] text-sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button disabled={saving || !form.institution || !form.account_name} onClick={handleSave} className="flex-1 h-9 bg-[#111111] text-[#FACC15] font-semibold text-sm rounded-lg">
                {saving ? "Saving..." : "Add Account"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
