"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Circle, Member } from "@/types";
import { getCurrencySymbol, SupportedCurrency } from "@/lib/currency";
import { format } from "date-fns";
import styles from "./CircleCompletionScreen.module.css";

interface CircleCompletionScreenProps {
  circle: Circle;
  members: Member[];
}

export function CircleCompletionScreen({ circle, members }: CircleCompletionScreenProps) {
  const t = useTranslations("circleCompletion");

  const currencySymbol = getCurrencySymbol(circle.contributionCurrency as SupportedCurrency);
  const totalSaved = circle.contributionFiat * circle.maxMembers * circle.currentCycle;
  const duration = circle.createdAt
    ? `${format(new Date(circle.createdAt), "MMM yyyy")} – ${format(new Date(circle.updatedAt), "MMM yyyy")}`
    : null;

  const shareText = encodeURIComponent(
    t("shareText", {
      name: circle.name,
      count: members.length,
      symbol: currencySymbol,
      total: totalSaved.toLocaleString(),
    }),
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.confetti} aria-hidden="true">🎉</div>
      <h1 className={styles.heading}>{t("heading")}</h1>
      <p className={styles.sub}>{t("sub")}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {currencySymbol}{totalSaved.toLocaleString()}
          </span>
          <span className={styles.statLabel}>{t("totalSaved")}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{members.length}</span>
          <span className={styles.statLabel}>{t("members")}</span>
        </div>
        {duration && (
          <div className={styles.stat}>
            <span className={styles.statValue}>{circle.currentCycle}</span>
            <span className={styles.statLabel}>{t("cyclesCompleted")}</span>
          </div>
        )}
      </div>

      {duration && <p className={styles.duration}>{duration}</p>}

      <div className={styles.actions}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary btn--sm"
        >
          {t("shareTwitter")}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary btn--sm"
        >
          {t("shareWhatsApp")}
        </a>
        <Link href="/circles/create" className="btn btn--primary btn--sm">
          {t("startNew")}
        </Link>
      </div>
    </div>
  );
}
