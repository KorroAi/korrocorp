"use client";

export function VerifyResults({ results, isImproved = false }: { results: any; isImproved?: boolean }) {
  if (!results?.integrity) return null;

  const integrity = results.integrity;
  const gradeColor =
    integrity.grade === "A" || integrity.grade === "B" ? "text-[#00B894]" :
    integrity.grade === "C" ? "text-[#FF6B35]" : "text-red-500";

  return (
    <div className="border border-[#E8E8E8] rounded-xl p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-semibold text-sm">
          {isImproved ? "Improved Integrity Score" : "Integrity Score"}
        </span>
        <span className={`font-display text-3xl font-bold ${gradeColor}`}>
          {integrity.score}/100 <span className="text-lg">{integrity.grade}</span>
        </span>
      </div>
      <p className="font-sans text-sm text-[#636E72] mb-2">{integrity.grade_description}</p>
      <p className="font-display font-semibold text-xs text-[#2D3436]">{integrity.recommendation}</p>
      {integrity.action_plan?.length > 0 && (
        <div className="mt-2 pt-2 border-t border-[#E8E8E8]">
          <p className="font-display text-xs font-semibold mb-1">Action plan:</p>
          {integrity.action_plan.slice(0, 8).map((a: string, i: number) => (
            <p key={`action-${i}`} className="font-mono text-xs text-[#636E72]">• {a}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export function EngineDetails({ results }: { results: any }) {
  if (!results?.report) return null;

  return (
    <div className="border border-[#E8E8E8] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-semibold text-sm">Engine Details</span>
        <span className="font-mono text-[10px] text-[#636E72]">
          {results.report?.filter((r: any) => r.status !== "ok").length || 0} issues
        </span>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {results.report?.map((r: any, i: number) => {
          let ri = r.result;
          if (Array.isArray(ri) && ri.length > 0) ri = ri[0];
          const summary = r.status === "ok" ? "All clear" :
            typeof ri === "object" && ri !== null
              ? [ri.dangers?.length ? `${ri.dangers.length} speculative` : '',
                 ri.warnings?.length ? `${ri.warnings.length} to review` : '',
                 ri.needs_evidence ? `${ri.needs_evidence} missing evidence` : '',
                 ri.unverifiable ? `${ri.unverifiable} unverifiable` : '',
                 ri.total_issues ? `${ri.total_issues} inconsistencies` : '']
                .filter(Boolean).join(', ') || "Issues detected"
              : String(r.result || '').slice(0, 50) || "Issues detected";
          return (
            <div key={`eng-${i}`} className={`border rounded-lg p-2.5 text-xs ${
              r.status === "ok" ? "border-[#00B894]/20 bg-[#00B894]/5" : "border-[#FF6B35]/20 bg-[#FF6B35]/5"
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold capitalize">{r.engine}</span>
                <span className={`font-mono text-[10px] ${r.status === "ok" ? "text-[#00B894]" : "text-[#FF6B35]"}`}>
                  {summary}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ApplyFixes({
  results, improveLoading, improveError, onApplyFixes,
}: {
  results: any; improveLoading: boolean; improveError: string; onApplyFixes: () => void;
}) {
  if (!results?.integrity?.action_plan?.length) return null;

  return (
    <div className="mt-4 border border-[#FF6B35]/20 bg-[#FF6B35]/5 rounded-xl p-4">
      <p className="font-display text-sm font-semibold mb-2">Not satisfied with the score?</p>
      <p className="font-sans text-xs text-[#636E72] mb-3">
        Our AI will apply the action plan above and generate an improved version of your paper.
      </p>
      <button
        onClick={onApplyFixes}
        disabled={improveLoading}
        className="w-full py-3 font-display font-semibold text-sm bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all active:scale-95 disabled:opacity-40"
      >
        {improveLoading ? <><span className="spinner" />Applying fixes & improving...</> : "Apply Fixes & Improve"}
      </button>
      {improveError && <p className="font-mono text-xs text-red-600 mt-2">{improveError}</p>}
    </div>
  );
}

export function ScoreComparison({
  original, improved, improvedVerifying, improvedContent, showImproved,
  onKeep, onShowOriginal,
}: {
  original: any; improved: any; improvedVerifying: boolean;
  improvedContent: string; showImproved: boolean;
  onKeep: () => void; onShowOriginal: () => void;
}) {
  if (!improvedContent || !showImproved) return null;

  return (
    <div className="mt-4 border-2 border-[#00B894]/30 rounded-xl overflow-hidden">
      {improvedVerifying ? (
        <div className="bg-[#00B894]/5 px-4 py-3 text-center">
          <span className="font-display text-sm text-[#00B894]">Verifying improved version...</span>
        </div>
      ) : original?.integrity && improved?.integrity ? (
        <div className="bg-[#00B894]/5 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-[#00B894]">Score Comparison</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1 text-center bg-white rounded-lg p-2">
              <div className="font-mono text-xs text-[#636E72]">Original</div>
              <div className={`font-display text-2xl font-bold ${
                original.integrity.grade === "A" || original.integrity.grade === "B" ? "text-[#00B894]" : "text-[#FF6B35]"
              }`}>{original.integrity.score}/100 <span className="text-sm">{original.integrity.grade}</span></div>
            </div>
            <div className="text-[#00B894] font-bold text-xl">→</div>
            <div className="flex-1 text-center bg-[#00B894]/10 rounded-lg p-2">
              <div className="font-mono text-xs text-[#00B894]">Improved</div>
              <div className={`font-display text-2xl font-bold ${
                improved.integrity.score > original.integrity.score ? "text-[#00B894]" : "text-[#FF6B35]"
              }`}>{improved.integrity.score}/100 <span className="text-sm">{improved.integrity.grade}</span></div>
            </div>
            <div className={`font-mono text-xs font-bold px-2 py-1 rounded-full ${
              improved.integrity.score > original.integrity.score ? "bg-[#00B894]/10 text-[#00B894]" :
              improved.integrity.score === original.integrity.score ? "bg-gray-100 text-[#636E72]" :
              "bg-[#FF6B35]/10 text-[#FF6B35]"
            }`}>
              {improved.integrity.score > original.integrity.score
                ? `+${improved.integrity.score - original.integrity.score}`
                : improved.integrity.score === original.integrity.score ? "="
                : improved.integrity.score - original.integrity.score}
            </div>
          </div>
        </div>
      ) : null}
      <div className="bg-[#00B894]/10 px-4 py-3 flex items-center justify-between border-t border-[#00B894]/20">
        <span className="font-display font-semibold text-sm text-[#00B894]">Improved Version</span>
        <div className="flex gap-2">
          <button onClick={onShowOriginal} className="font-sans text-xs text-[#636E72] underline hover:text-[#2D3436]">Show original</button>
          <button onClick={onKeep} className="font-display text-xs font-semibold bg-[#00B894] text-white px-3 py-1 rounded-lg hover:bg-[#00a37d] transition">Keep this version</button>
        </div>
      </div>
    </div>
  );
}
