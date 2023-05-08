export default {
    value: {
        type: [String, Number, Date, null, Object],
        default: '',
        required: true,
    },
    type: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '',
    },
    variant: {
        type: String,
        default: 'primary',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    success: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    outline: {
        type: Boolean,
        default: true,
    },
    className: {
        type: [String, Array, Object],
        default: '',
    },
    rules: {
        type: Object,
        default: () => ({}),
    },
    errors: {
        type: [Array, Object, String],
        default: null,
    },
    nameError: {
        type: String,
        default: '',
    },
    settings: {
        type: Object,
        default: () => ({}),
    },
}
