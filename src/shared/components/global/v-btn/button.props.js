export default {
    to: {
        type: [String, Object],
        default: '',
    },
    href: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '',
    },
    background: {
        type: String,
        default: '',
    },
    borderColor: {
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
    fontSize: {
        type: String,
        default: '',
    },
    rounded: {
        type: String,
        default: '4px',
    },
    outline: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        default: 'primary',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    loadingStyle: {
        type: Object,
        default: () => ({}),
    },
    styles: {
        type: Object,
        default: () => ({}),
    },
    className: {
        type: [String, Array, Object],
        default: '',
    },
}
