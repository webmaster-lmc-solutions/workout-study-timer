import React, { useEffect, useMemo, useReducer, useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import {
  initialTimerState,
  timerReducer,
  formatTimeMMSS,
  safeParseMinutes,
  runBrowserChecks,
  type TimerMode,
} from "./timerLogic";

export function App() {
  const [mode, setMode] = useState<TimerMode>("study");
  const [minutesInput, setMinutesInput] = useState("25");

  const [state, dispatch] = useReducer(timerReducer, initialTimerState(mode));

  useEffect(() => {
    dispatch({ type: "SWITCH_MODE", mode });
  }, [mode]);

  useEffect(() => {
    if (!state.isRunning) return;

    const id = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => window.clearInterval(id);
  }, [state.isRunning]);

  const remainingLabel = useMemo(
    () => formatTimeMMSS(state.remainingSeconds),
    [state.remainingSeconds]
  );

  const onApplyMinutes = () => {
    const minutes = safeParseMinutes(minutesInput);
    dispatch({ type: "SET_DURATION_MINUTES", minutes });
  };

  const checks = useMemo(() => runBrowserChecks(), []);

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Workout / Study Timer</Text>
        <Text style={styles.subtitle}>
          React Native Web • follow-the-instructions mini assignment
        </Text>

        <View style={styles.row}>
          <ModeChip label="Study" active={mode === "study"} onPress={() => setMode("study")} />
          <ModeChip label="Workout" active={mode === "workout"} onPress={() => setMode("workout")} />
        </View>

        <View style={styles.timer}>
          <Text style={styles.timerText}>{remainingLabel}</Text>
          <Text style={styles.timerHint}>
            {state.isRunning ? "Running…" : state.remainingSeconds === 0 ? "Done ✅" : "Paused"}
          </Text>
        </View>

        <View style={styles.controls}>
          <PrimaryButton
            label={state.isRunning ? "Pause" : "Start"}
            onPress={() => dispatch({ type: state.isRunning ? "PAUSE" : "START" })}
          />
          <SecondaryButton label="Reset" onPress={() => dispatch({ type: "RESET" })} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.row}>
            <TextInput
              value={minutesInput}
              onChangeText={setMinutesInput}
              style={styles.input}
              inputMode="numeric"
              placeholder="minutes"
            />
            <SecondaryButton label="Apply" onPress={onApplyMinutes} />
          </View>
          <Text style={styles.smallText}>Tip: try 1–3 minutes while testing.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Checks</Text>
          <Text style={styles.smallText}>
            These checks will fail until you complete the TODOs in{" "}
            <Text style={styles.code}>src/timerLogic.ts</Text>.
          </Text>
          <View style={styles.checkList}>
            {checks.map((c) => (
              <View key={c.name} style={styles.checkRow}>
                <Text style={styles.checkIcon}>{c.ok ? "✅" : "❌"}</Text>
                <Text style={styles.checkText}>{c.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Assignment workflow: create a branch → make your changes → open a PR.
        </Text>
      </View>
    </View>
  );
}

function ModeChip(props: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={props.onPress} style={[styles.chip, props.active && styles.chipActive]}>
      <Text style={[styles.chipText, props.active && styles.chipTextActive]}>{props.label}</Text>
    </Pressable>
  );
}

function PrimaryButton(props: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={props.onPress} style={[styles.button, styles.buttonPrimary]}>
      <Text style={[styles.buttonText, styles.buttonTextPrimary]}>{props.label}</Text>
    </Pressable>
  );
}

function SecondaryButton(props: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={props.onPress} style={[styles.button, styles.buttonSecondary]}>
      <Text style={[styles.buttonText, styles.buttonTextSecondary]}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    minHeight: "100vh",
    padding: 24,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  title: { fontSize: 20, fontWeight: "700", color: "#111827" },
  subtitle: { marginTop: 6, color: "#4B5563" },
  row: { flexDirection: "row", gap: 10, marginTop: 14, alignItems: "center" },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
  },
  chipActive: { backgroundColor: "#DCF7EC", borderColor: "#10B981" },
  chipText: { color: "#374151", fontWeight: "600" },
  chipTextActive: { color: "#065F46" },
  timer: { marginTop: 18, alignItems: "center" },
  timerText: { fontSize: 48, fontWeight: "800", color: "#111827", letterSpacing: 1 },
  timerHint: { marginTop: 6, color: "#6B7280" },
  controls: { flexDirection: "row", gap: 10, marginTop: 18 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  buttonPrimary: { backgroundColor: "#3A8DFF" },
  buttonSecondary: { backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB" },
  buttonText: { fontWeight: "700" },
  buttonTextPrimary: { color: "#FFFFFF" },
  buttonTextSecondary: { color: "#111827" },
  section: { marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: "#E5E7EB" },
  sectionTitle: { fontSize: 14, fontWeight: "800", color: "#111827" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  smallText: { marginTop: 8, color: "#4B5563", fontSize: 12 },
  code: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
  checkList: { marginTop: 10, gap: 6 },
  checkRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkIcon: { fontSize: 14 },
  checkText: { color: "#111827" },
  footer: { marginTop: 16, color: "#6B7280", fontSize: 12, textAlign: "center" },
});
