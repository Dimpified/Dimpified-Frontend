import mixpanel from "./mixpanel";

const REG_STEPS = {
  account: { index: 1, label: "Account Info" },
  verify_email: { index: 2, label: "Verify Email" },
  business_info: { index: 3, label: "Business Info" },
  business_category: { index: 4, label: "Business Category" },
  template: { index: 5, label: "Template Selection" },
  payment: { index: 6, label: "Payment" },
};

// Track when user views a step
export function trackStepView(step) {
  const s = REG_STEPS[step];
  mixpanel.track("Registration", {
    action: "view",
    step,
    step_index: s.index,
    step_label: s.label,
  });
}

// Track when user submits a step
export function trackStepSubmit(step, extra = {}) {
  const s = REG_STEPS[step];
  mixpanel.track("Registration", {
    action: "submit",
    step,
    step_index: s.index,
    step_label: s.label,
    ...extra,
  });
}

export function startRegistrationTimer() {
  mixpanel.time_event("Registration Completed");
}

export function finishRegistration(extra = {}) {
  mixpanel.track("Registration Completed", extra);
}
