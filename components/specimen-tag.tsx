import { Specimen, taxonTrail, resolveImageSrc } from "@/lib/specimens";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-semibold tracking-wide text-accent">{label}</dt>
      <dd className="m-0">
        {value ? value : <span className="text-border">—</span>}
      </dd>
    </>
  );
}

export function SpecimenTag({ specimen }: { specimen: Specimen }) {
  const trail = taxonTrail(specimen.class_phylum);
  const hasNotes = specimen.notes || specimen.sources;
  const photoSrc = resolveImageSrc(specimen.image);

  return (
    <div className="relative border border-border bg-card p-9 shadow-[0_10px_24px_-14px_rgba(36,31,23,0.18)] before:pointer-events-none before:absolute before:inset-3.5 before:border before:border-border">
      {photoSrc && (
        <img
          src={photoSrc}
          alt={specimen.common_name}
          className="mb-6 aspect-[4/3] w-full border border-border object-cover"
        />
      )}
      <h1 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-[1.08] text-foreground">
        {specimen.common_name || `Specimen ${specimen.id}`}
      </h1>

      {specimen.scientific_name && (
        <p className="mb-3.5 mt-0.5 italic text-muted-foreground">
          {specimen.scientific_name}
        </p>
      )}

      {trail.length > 0 && (
        <p className="mb-5 text-[0.72rem] tracking-wider text-secondary">
          {trail.map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="taxon-trail sep">&rsaquo;</span>}
              {t}
            </span>
          ))}
        </p>
      )}

      <hr className="my-5 border-t border-dashed border-border" />

      {specimen.description && (
        <p className="font-display text-[1.05rem] leading-relaxed text-foreground">
          {specimen.description}
        </p>
      )}

      <hr className="my-5 border-t border-dashed border-border" />

      <dl className="grid grid-cols-[148px_1fr] gap-x-[18px] gap-y-3.5 text-[0.86rem]">
        <Field label="Habitat" value={specimen.habitat} />
        <Field label="Diet" value={specimen.diet} />
        <Field label="Conservation" value={specimen.conservation_status} />
      </dl>

      {hasNotes && (
        <>
          <hr className="my-5 border-t border-dashed border-border" />
          {specimen.notes && (
            <p className="text-[0.86rem] text-muted-foreground">
              <strong className="font-semibold text-foreground">Notes:</strong>{" "}
              {specimen.notes}
            </p>
          )}
          {specimen.sources && (
            <p className="text-[0.86rem] text-muted-foreground">
              <strong className="font-semibold text-foreground">Sources:</strong>{" "}
              {specimen.sources}
            </p>
          )}
        </>
      )}
    </div>
  );
}