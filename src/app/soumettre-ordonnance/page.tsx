"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  FileText,
  RefreshCw,
  ArrowLeftRight,
  Upload,
  X,
  User,
  Stethoscope,
  Store,
  Truck,
  ShieldCheck,
  Phone,
  Clock,
  CheckCircle2,
} from "lucide-react";

/**
 * Page « Soumettre une ordonnance » — Pharmacie Bon Le Bon
 * Réutilise les tokens de la page Circulaire :
 *   vert marque  #0F7A3D / #0A5C2E
 *   fond sombre  #0B0F0C   surface carte #0F2718 / #12321F
 *   bordures     #1B4A2C / #2C5B3D
 *   crème accent #FBECA0 / texte #5B3A1E
 *   terracotta   #8B4A2B
 *   texte clair  #F0F4F1 / #E3EDE6 / #8FEFB8
 */

type SubmissionType = "nouvelle" | "renouvellement" | "transfert";
type DeliveryMethod = "cueillette" | "livraison";

const submissionOptions: {
  value: SubmissionType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "nouvelle", label: "Nouvelle ordonnance", icon: FileText },
  { value: "renouvellement", label: "Renouvellement", icon: RefreshCw },
  {
    value: "transfert",
    label: "Transfert d'une autre pharmacie",
    icon: ArrowLeftRight,
  },
];

const steps = [
  {
    title: "Vous l'envoyez",
    description: "Téléversez une photo ou un PDF, ou remplissez le formulaire.",
  },
  {
    title: "On la traite",
    description: "Notre équipe valide l'ordonnance avec votre médecin au besoin.",
  },
  {
    title: "Vous êtes avisé",
    description: "Un SMS ou un courriel vous confirme quand c'est prêt.",
  },
];

export default function SoumettreOrdonnancePage() {
  const [submissionType, setSubmissionType] =
    useState<SubmissionType>("nouvelle");
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("cueillette");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Point d'intégration : envoyer `new FormData(e.currentTarget)`
    // (+ le fichier) à votre API / service de traitement d'ordonnances.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F0C] px-6 py-20 text-[#F0F4F1]">
        <div className="w-full max-w-md rounded-2xl border border-[#1B4A2C] bg-[#0F2718] p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#123B22] text-[#8FEFB8]">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-white">
            Ordonnance envoyée
          </h1>
          <p className="mt-2 text-sm text-[#E3EDE6]">
            Merci ! Notre équipe la traite dans les prochaines heures
            ouvrables. Vous recevrez un avis dès qu'elle sera prête.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFileName(null);
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#FBECA0] px-5 py-3 text-sm font-bold text-[#5B3A1E] transition hover:bg-[#F7E27A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBECA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F2718]"
          >
            Soumettre une autre ordonnance
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F0C] text-[#F0F4F1]">
      <div className="h-1 w-full bg-[#8B4A2B]" />

      {/* ---- En-tête ---- */}
      <section className="relative overflow-hidden border-b border-[#1B4A2C] bg-gradient-to-b from-[#0F2718] to-[#0B0F0C] px-6 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0F7A3D]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FBECA0] px-4 py-1.5 text-sm font-bold tracking-wide text-[#5B3A1E]">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Rapide et sécurisé
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Soumettre une ordonnance
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#F0F4F1] sm:text-lg">
            Envoyez une photo de votre ordonnance ou demandez un
            renouvellement en quelques minutes. Nous nous occupons du reste.
          </p>

          {/* Étapes : ordre réel du processus, la numérotation est donc justifiée */}
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-[#1B4A2C] bg-[#0F2718]/60 p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123B22] text-sm font-bold text-[#8FEFB8]">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm font-bold text-white">
                  {step.title}
                </p>
                <p className="mt-1 text-xs text-[#E3EDE6]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Formulaire ---- */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border border-[#1B4A2C] bg-[#0F2718] p-6 sm:p-8"
          >
            {/* Type d'ordonnance */}
            <fieldset>
              <legend className="text-sm font-bold uppercase tracking-wide text-[#8FEFB8]">
                Type de demande
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {submissionOptions.map(({ value, label, icon: Icon }) => {
                  const isActive = submissionType === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSubmissionType(value)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D] ${
                        isActive
                          ? "border-[#0F7A3D] bg-[#123B22] text-white"
                          : "border-[#1B4A2C] bg-transparent text-[#E3EDE6] hover:border-[#2C5B3D]"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Téléversement */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#8FEFB8]">
                Photo ou PDF de l&apos;ordonnance
              </p>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    fileInputRef.current?.click();
                }}
                className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#2C5B3D] bg-[#0B0F0C]/40 px-6 py-10 text-center transition hover:border-[#0F7A3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123B22] text-[#8FEFB8]">
                  <Upload className="h-5 w-5" aria-hidden />
                </span>
                {fileName ? (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <FileText className="h-4 w-4" aria-hidden />
                    {fileName}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileName(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      aria-label="Retirer le fichier"
                      className="rounded-full p-1 text-[#E3EDE6] hover:text-white"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-white">
                      Glissez un fichier ici ou cliquez pour parcourir
                    </p>
                    <p className="text-xs text-[#E3EDE6]">
                      JPG, PNG ou PDF, 10 Mo maximum
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="ordonnance"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>
              <p className="mt-2 text-xs text-[#E3EDE6]">
                Pas de fichier sous la main ? Remplissez seulement vos
                coordonnées ci-dessous, nous contacterons votre médecin.
              </p>
            </div>

            {/* Patient */}
            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#8FEFB8]">
                <User className="h-4 w-4" aria-hidden />
                Vos coordonnées
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom complet" name="nom" required />
                <Field
                  label="Date de naissance"
                  name="naissance"
                  type="date"
                  required
                />
                <Field
                  label="Numéro d'assurance maladie"
                  name="ramq"
                  placeholder="XXXX 0000 0000"
                  required
                />
                <Field
                  label="Téléphone"
                  name="telephone"
                  type="tel"
                  placeholder="514 555-0123"
                  required
                />
              </div>
              <Field
                label="Courriel"
                name="courriel"
                type="email"
                placeholder="vous@courriel.com"
                required
              />
            </fieldset>

            {/* Médecin */}
            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#8FEFB8]">
                <Stethoscope className="h-4 w-4" aria-hidden />
                Médecin prescripteur{" "}
                <span className="text-xs font-normal normal-case text-[#E3EDE6]">
                  (facultatif)
                </span>
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom du médecin" name="medecin" />
                <Field label="Clinique ou établissement" name="clinique" />
              </div>
            </fieldset>

            {/* Réception */}
            <fieldset>
              <legend className="text-sm font-bold uppercase tracking-wide text-[#8FEFB8]">
                Mode de réception
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    {
                      value: "cueillette",
                      label: "Cueillette en pharmacie",
                      icon: Store,
                    },
                    {
                      value: "livraison",
                      label: "Livraison à domicile",
                      icon: Truck,
                    },
                  ] as const
                ).map(({ value, label, icon: Icon }) => {
                  const isActive = deliveryMethod === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDeliveryMethod(value)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D] ${
                        isActive
                          ? "border-[#0F7A3D] bg-[#123B22] text-white"
                          : "border-[#1B4A2C] bg-transparent text-[#E3EDE6] hover:border-[#2C5B3D]"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {label}
                    </button>
                  );
                })}
              </div>
              {deliveryMethod === "livraison" && (
                <div className="mt-4">
                  <Field
                    label="Adresse de livraison"
                    name="adresse"
                    placeholder="123 rue Principale, Montréal"
                    required
                  />
                </div>
              )}
            </fieldset>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="text-sm font-bold uppercase tracking-wide text-[#8FEFB8]"
              >
                Notes additionnelles{" "}
                <span className="text-xs font-normal normal-case text-[#E3EDE6]">
                  (facultatif)
                </span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Allergies, préférence de générique, précisions pour le livreur…"
                className="mt-3 w-full rounded-lg border border-[#1B4A2C] bg-[#0B0F0C]/40 px-4 py-3 text-sm text-white placeholder:text-[#6E8577] focus:border-[#0F7A3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D]"
              />
            </div>

            {/* Consentement */}
            <label className="flex items-start gap-3 text-sm text-[#E3EDE6]">
              <input
                type="checkbox"
                required
                name="consentement"
                className="mt-1 h-4 w-4 rounded border-[#2C5B3D] bg-transparent text-[#0F7A3D] focus:ring-2 focus:ring-[#0F7A3D]"
              />
              J&apos;autorise la Pharmacie Bon Le Bon à traiter cette
              ordonnance et à communiquer avec mon médecin au besoin.
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FBECA0] px-5 py-3.5 text-sm font-bold text-[#5B3A1E] transition hover:bg-[#F7E27A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBECA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F2718] sm:w-auto"
            >
              Envoyer l&apos;ordonnance
            </button>
          </form>

          {/* ---- Aide ---- */}
          <aside className="h-fit space-y-4 rounded-2xl border border-[#1B4A2C] bg-[#0F2718] p-6">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <Phone className="h-4 w-4 text-[#8FEFB8]" aria-hidden />
                Besoin d&apos;aide ?
              </p>
              <p className="mt-2 text-sm text-[#E3EDE6]">
                Notre équipe peut soumettre l&apos;ordonnance pour vous par
                téléphone.
              </p>
              <a
                href="tel:+15145550123"
                className="mt-2 inline-block text-sm font-semibold text-[#8FEFB8] underline decoration-[#8FEFB8]/40 underline-offset-4 hover:text-[#FBECA0]"
              >
                514 555-0123
              </a>
            </div>

            <div className="border-t border-[#1B4A2C] pt-4">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <Clock className="h-4 w-4 text-[#8FEFB8]" aria-hidden />
                Heures du service ordonnances
              </p>
              <p className="mt-2 text-sm text-[#E3EDE6]">
                Lundi au vendredi, 9 h à 21 h
                <br />
                Samedi et dimanche, 10 h à 17 h
              </p>
            </div>

            <div className="border-t border-[#1B4A2C] pt-4">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-[#8FEFB8]" aria-hidden />
                Confidentiel
              </p>
              <p className="mt-2 text-sm text-[#E3EDE6]">
                Vos renseignements de santé sont chiffrés et ne sont utilisés
                que pour traiter votre ordonnance.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-[#E3EDE6]"
      >
        {label}
        {required && <span className="text-[#8FEFB8]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-[#1B4A2C] bg-[#0B0F0C]/40 px-4 py-2.5 text-sm text-white placeholder:text-[#6E8577] focus:border-[#0F7A3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D]"
      />
    </div>
  );
}