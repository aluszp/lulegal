"use client";

import Image from "next/image";
import Link from "next/link";

import { Section, SectionTitle, Squares } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/lib/site";

/* porozmawiajmy o Twojej sprawie: the contact form (shadcn Input,
   Textarea, Checkbox, Label, Button) and the phone numbers.
   Not sent anywhere yet – sending (e-mail service and the real
   reCAPTCHA) is connected when the site goes live. */

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="block text-[length:var(--body)] leading-[normal] font-medium">
        {label} <span className="text-coral" aria-hidden>*</span>
      </Label>
      {children}
    </div>
  );
}

export function Contact() {
  return (
    <Section tone="navy" stage="contact" id="kontakt" aria-labelledby="kontakt-title">
      <Squares />
      <SectionTitle id="kontakt-title">porozmawiajmy o Twojej sprawie</SectionTitle>

      <div className="mt-6 flex flex-col items-start gap-16 md:mt-[72px] lg:mt-24 lg:flex-row lg:gap-24">
        <form
          className="flex w-full min-w-0 flex-col gap-8 lg:w-auto lg:flex-[0_1_741px]"
          data-stage-card
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-[length:var(--body)] font-medium">
            W ciągu 24 godzin (w dni robocze) odpowiemy, jak możemy Ci pomóc.
          </p>
          <Field id="cf-message" label="W czym możemy Ci pomóc?">
            <Textarea id="cf-message" name="message" required />
          </Field>
          <Field id="cf-name" label="Imię i nazwisko">
            <Input id="cf-name" name="name" autoComplete="name" required />
          </Field>
          <Field id="cf-email" label="Twój email, na który odpowiemy">
            <Input id="cf-email" name="email" type="email" autoComplete="email" required />
          </Field>

          <div className="flex flex-col items-start gap-6 md:flex-row">
            {/* placeholder for the reCAPTCHA widget, drawn as in Figma */}
            <Label className="relative h-[74px] w-full max-w-[302px] flex-none gap-3.5 rounded-[2px] border border-[#d6d6d6] bg-[#fafafa] px-3 font-[Roboto,system-ui,sans-serif] text-sm leading-[normal] font-medium text-black shadow-[0_1px_1px_rgb(0_0_0/0.1)]">
              <Checkbox name="captcha" required />
              Nie jestem robotem
              <span aria-hidden className="absolute top-1/2 right-2.5 flex -translate-y-1/2 flex-col items-center gap-1 text-[8px] text-[#a6a6a6]">
                <Image src="/assets/icons/recaptcha.svg" alt="" width={48} height={46} />
                Privacy - Terms
              </span>
            </Label>
            <p className="min-w-0 flex-1 text-sm font-medium">
              Administratorem Twoich danych jest Lu Legal, {contact.address}. Podane dane wykorzystamy wyłącznie, aby
              odpowiedzieć na Twoje zapytanie. Więcej o przetwarzaniu danych znajdziesz w{" "}
              <Link href="#" className="underline transition-colors hover:text-coral">
                Polityce Prywatności
              </Link>
              .
            </p>
          </div>

          <Button type="submit" className="self-start">
            Wyślij
          </Button>
        </form>

        <div className="flex min-w-0 flex-1 flex-col gap-6" data-stage-card>
          <p className="text-[length:var(--body)] font-medium">Wolisz zadzwonić?</p>
          <ul className="flex flex-col gap-10">
            {contact.people.map((p) => (
              <li key={p.tel} className="flex flex-col gap-1.5">
                <a href={`tel:${p.tel}`} className="text-[length:var(--lead)] font-medium transition-colors hover:text-coral focus-visible:text-coral">
                  {p.phone}
                </a>
                <span className="text-[length:var(--label)] font-semibold tracking-[0.1em] text-coral uppercase">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
