export default function SoftBackdrop() {
    return (
        <div className="fixed z-0 -inset-50 pointer-events-none">
            <div className="absolute left-20 top-10 -translate-x-1/2 w-300 h-100 bg-linear-to-tr from-red-600/40 to-transparent rounded-full blur-3xl" />
            <div className="absolute right-0 -bottom-96 w-200 h-200 bg-linear-to-bl from-blue-700/20 to-transparent rounded-full blur-3xl" />
        </div>
    )
}