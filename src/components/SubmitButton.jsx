import { useFormStatus } from "react-dom";

export default function SubmitButton({ title, className }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`${className} ${pending && "animate-pulse"}`}
            disabled={pending}
        >
            {title}
        </button>
    );
}



   