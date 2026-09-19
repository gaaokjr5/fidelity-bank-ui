// ==========================================
// MULTI-STEP FORM WORKFLOW — progress.js
// Step circles & lines light up green automatically
// ==========================================

class FormWorkflow {
    constructor() {
        this.totalSteps = 3;
        this.currentStep = 0;
        this.storageKey = 'applicationFormState';
        this.init();
    }

    init() {
        this.loadState();
        this.renderStepVisibility();
        this.updateProgressUI(); // ← Lights up steps on load
    }

    // Escape HTML for security (used in review step)
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    // Go to next step
    nextStep() {
        if (!this.validateCurrentStep()) return false;
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.saveState();
            this.renderStepVisibility();
            this.updateProgressUI(); // ← Lights up steps on move
            return true;
        }
        return false;
    }

    // Go to previous step
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.saveState();
            this.renderStepVisibility();
            this.updateProgressUI(); // ← Updates lights when going back
            return true;
        }
        return false;
    }

    // Show/hide form sections based on current step
    renderStepVisibility() {
        document.querySelectorAll('.form-section').forEach((section, index) => {
            section.hidden = index !== this.currentStep;
        });
    }

    // ✅ LIGHT UP STEP CIRCLES & LINES
    updateProgressUI() {
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach((step, index) => {
            if (index < this.currentStep) {
                // Completed steps — fully lit green
                step.classList.add('active', 'completed');
                step.querySelector('.step-number').style.borderColor = '#00703c';
                step.querySelector('.step-number').style.background = '#00703c';
                step.querySelector('.step-number').style.color = '#fff';
                // Light up the connecting line
                const line = step.querySelector('.step-line');
                if (line) line.style.background = '#00703c';
            } else if (index === this.currentStep) {
                // Current step — active styling
                step.classList.add('active');
                step.classList.remove('completed');
                step.querySelector('.step-number').style.borderColor = '#00703c';
                step.querySelector('.step-number').style.background = '#00703c';
                step.querySelector('.step-number').style.color = '#fff';
            } else {
                // Future steps — gray/inactive
                step.classList.remove('active', 'completed');
                step.querySelector('.step-number').style.borderColor = '#ddd';
                step.querySelector('.step-number').style.background = '#fff';
                step.querySelector('.step-number').style.color = '#999';
                const line = step.querySelector('.step-line');
                if (line) line.style.background = '#eee';
            }
        });
    }

    // Validate fields on current step
    validateCurrentStep() {
        const section = document.querySelector(`.form-section[data-step="${this.currentStep + 1}"]`);
        if (!section) return true;

        let isValid = true;
        const fields = section.querySelectorAll('input[required], select[required]');

        fields.forEach(field => {
            const group = field.closest('.input-group');
            let hasError = false;

            if (!field.value.trim()) {
                hasError = true;
            } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                hasError = true;
            } else if (field.id === 'phone' && !/^(\+234|0)[0-9]{10,11}$/.test(field.value.replace(/\s/g, ''))) {
                hasError = true;
            }

            if (hasError) {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.remove('error');
            }
        });

        return isValid;
    }

    // Save form data to localStorage (preserve on refresh)
    saveState() {
        const form = document.getElementById('multiStepForm');
        if (!form) return;
        const data = Object.fromEntries(new FormData(form));
        localStorage.setItem(this.storageKey, JSON.stringify({
            currentStep: this.currentStep,
            formData: data
        }));
    }

    // Load saved form data on page reload
    loadState() {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) return;
        try {
            const { currentStep, formData } = JSON.parse(saved);
            this.currentStep = currentStep || 0;

            // Restore field values
            Object.entries(formData || {}).forEach(([name, value]) => {
                const field = document.querySelector(`[name="${name}"]`);
                if (field) field.value = value;
            });
        } catch (e) {
            console.warn('Could not restore form state');
        }
    }

    // Clear saved data after submission
    clearState() {
        localStorage.removeItem(this.storageKey);
        this.currentStep = 0;
        document.getElementById('multiStepForm')?.reset();
        this.renderStepVisibility();
        this.updateProgressUI();
    }
}

// Initialize and make globally available for index.html
document.addEventListener('DOMContentLoaded', () => {
    window.workflow = new FormWorkflow();
});

export default FormWorkflow;