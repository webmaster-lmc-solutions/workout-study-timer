/**
 * WORKOUT / STUDY TIMER (React Native Web)
 *
 * Student TODOs live in this file.
 * Keep changes focused here unless the instructions say otherwise.
 */

export type TimerMode = "study" | "workout";

export type TimerState = {
  mode: TimerMode;
  durationSeconds: number;    // total duration
  remainingSeconds: number;   // countdown
  isRunning: boolean;
};

export type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "SET_DURATION_MINUTES"; minutes: number }
  | { type: "SWITCH_MODE"; mode: TimerMode };

export function initialTimerState(mode: TimerMode): TimerState {
  const defaults = mode === "study" ? 25 : 10;
  const durationSeconds = defaults * 60;

  return {
    mode,
    durationSeconds,
    remainingSeconds: durationSeconds,
    isRunning: false,
  };
}

/**
 * TODO #1
 * Implement a safe minutes parser:
 * - accepts strings like "25", "  15 ", "0", "999"
 * - returns a number in range 1..180
 * - non-numeric or empty -> return 25 (default)
 */
export function safeParseMinutes(input: string): number {
  const n = Number(input);
  if(!Number.isFinite(n)) return 25;
  return math.max(1,Math.min(180, Math.floor(n)));
}

/**
 * TODO #2
 * Format seconds as "MM:SS" (zero-padded).
 * Examples:
 * - 0   -> "00:00"
 * - 5   -> "00:05"
 * - 65  -> "01:05"
 * - 600 -> "10:00"
 */
export function formatTimeMMSS(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`; // intentionally wrong (no padding)
}

/**
 * TODO #3
 * Reducer behavior rules:
 * - START: isRunning -> true (unless remainingSeconds === 0, then RESET first and start)
 * - PAUSE: isRunning -> false
 * - RESET: set remainingSeconds back to durationSeconds; isRunning -> false
 * - SET_DURATION_MINUTES: update durationSeconds; also reset remainingSeconds to match; pause
 * - SWITCH_MODE: swap to that mode's defaults (use initialTimerState); pause
 * - TICK: if isRunning:
 *     - decrement remainingSeconds by 1, but never below 0
 *     - when it reaches 0, automatically pause (isRunning false)
 */
export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START":
      if(state.remainingSeconds === 0) {
        return {
          ...state,
          remainingSeconds: state.durationSeconds,
          isRunning: true,
        };
      }
      return { ...state, isRunning: true };

    case "PAUSE":
      return { ...state, isRunning: false };

    case "RESET":
      return { ...state, remainingSeconds: state.durationSeconds, isRunning: false };

    case "SET_DURATION_MINUTES": {
      const durationSeconds = action.minutes * 60;
      return { ...state, durationSeconds, remainingSeconds: durationSeconds, isRunning: false };
    }

    case "SWITCH_MODE":
      return initialTimerState(action.mode);

    case "TICK":
      if (!state.isRunning) return state;
      const next = Math.max(0, state.remainingSeconds - 1);
      return {
        ...state,
        remainingSeconds: next,
        isRunning: next === 0 ? false : state.isRunning,
      };

    default:
      return state;
  }
}

/**
 * Browser-friendly checks so students can see progress without installing a test runner.
 * These are not exhaustive; they're just guardrails.
 */
export function runBrowserChecks(): Array<{ name: string; ok: boolean }> {
  const checks: Array<{ name: string; ok: boolean }> = [];

  checks.push({
    name: "safeParseMinutes clamps to 1..180",
    ok: safeParseMinutes("999") === 180 && safeParseMinutes("0") === 1,
  });
  checks.push({
    name: "safeParseMinutes defaults on bad input",
    ok: safeParseMinutes("nope") === 25,
  });

  checks.push({
    name: "formatTimeMMSS pads minutes/seconds",
    ok: formatTimeMMSS(5) === "00:05" && formatTimeMMSS(65) === "01:05",
  });

  const s0 = initialTimerState("study");
  const s1 = timerReducer({ ...s0, remainingSeconds: 2 }, { type: "START" });
  const s2 = timerReducer(s1, { type: "TICK" });
  const s3 = timerReducer(s2, { type: "TICK" });

  checks.push({ name: "TICK never goes below 0", ok: s3.remainingSeconds >= 0 });
  checks.push({
    name: "Auto-pause at 0",
    ok: s3.remainingSeconds !== 0 ? true : s3.isRunning === false,
  });

  return checks;
}
