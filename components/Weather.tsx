'use client';

import { useEffect, useState } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  Lightning,
  SunDim
} from '@phosphor-icons/react/dist/ssr';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Current conditions + 5-day forecast for a lat/lng, using Open-Meteo's
 * genuinely-keyless public API. No signup, no key, no cost.
 * Response is cached by the browser for ~15 min (Open-Meteo sets headers).
 */
export default function Weather({ lat, lng, label = 'Ayia Napa' }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.search = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lng),
      current: 'temperature_2m,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      forecast_days: '5'
    }).toString();

    fetch(url.toString())
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setData)
      .catch(() => setErr(true));
  }, [lat, lng]);

  if (err) return null;

  if (!data) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col gap-4">
        <Skeleton className="h-4 w-24 rounded" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-20 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const current = data.current;
  const days = data.daily;
  const currentInfo = codeToInfo(current.weather_code);

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="label label-accent">Weather · {label}</span>
        <span className="font-mono text-[0.65rem] text-[var(--fg-muted)] tracking-wider uppercase">
          Open-Meteo
        </span>
      </div>

      <div className="flex items-center gap-5 mb-5">
        <div className="text-[var(--accent)]">
          <currentInfo.Icon size={46} weight="light" />
        </div>
        <div>
          <div className="font-display text-4xl font-medium leading-none">
            {Math.round(current.temperature_2m)}°<span className="text-2xl text-[var(--fg-muted)]">C</span>
          </div>
          <div className="text-sm text-[var(--fg-2)] mt-1">{currentInfo.label}</div>
          <div className="text-xs text-[var(--fg-muted)] mt-0.5">
            Wind {Math.round(current.wind_speed_10m)} km/h
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 border-t border-[var(--line)] pt-4">
        {days.time.map((iso, i) => {
          const info = codeToInfo(days.weather_code[i]);
          return (
            <div key={iso} className="flex flex-col items-center gap-1.5 text-center">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--fg-muted)]">
                {i === 0 ? 'Today' : weekday(iso)}
              </span>
              <span className="text-[var(--accent)]">
                <info.Icon size={20} weight="light" />
              </span>
              <span className="text-xs font-medium">
                {Math.round(days.temperature_2m_max[i])}°
                <span className="text-[var(--fg-muted)] font-normal ml-0.5">
                  {Math.round(days.temperature_2m_min[i])}°
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Open-Meteo WMO weather codes → readable label + phosphor icon
function codeToInfo(code) {
  if (code === 0) return { label: 'Clear sky', Icon: Sun };
  if ([1, 2].includes(code)) return { label: 'Mostly clear', Icon: SunDim };
  if (code === 3) return { label: 'Overcast', Icon: Cloud };
  if ([45, 48].includes(code)) return { label: 'Fog', Icon: CloudFog };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', Icon: CloudRain };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain', Icon: CloudRain };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', Icon: CloudSnow };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', Icon: Lightning };
  return { label: 'Mixed', Icon: Cloud };
}

function weekday(iso) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'short' });
}
