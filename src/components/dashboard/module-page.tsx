type ModulePageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  cards: Array<{ label: string; value: string; note?: string }>;
  listTitle: string;
  listItems: string[];
};

export function ModulePage({
  eyebrow,
  title,
  summary,
  cards,
  listTitle,
  listItems,
}: ModulePageProps) {
  return (
    <section className="space-y-6">
      <header className="dashboard-panel rounded p-5 md:p-6">
        <p className="dashboard-muted font-mono text-[10px] uppercase tracking-[0.18em]">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-light md:text-3xl">{title}</h2>
        <p className="dashboard-muted mt-3 max-w-3xl text-sm leading-6">{summary}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="dashboard-card rounded p-4">
            <p className="dashboard-muted font-mono text-[10px] uppercase tracking-[0.15em]">{card.label}</p>
            <p className="mt-2 text-2xl font-light">{card.value}</p>
            {card.note ? <p className="dashboard-muted mt-1 text-xs">{card.note}</p> : null}
          </article>
        ))}
      </div>

      <div className="dashboard-card rounded p-5">
        <h3 className="text-lg font-medium">{listTitle}</h3>
        <ul className="mt-4 space-y-3">
          {listItems.map((item) => (
            <li key={item} className="dashboard-item px-3 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
