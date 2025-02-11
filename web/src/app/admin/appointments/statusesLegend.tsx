import { statuses } from "@/shared/statues";

export default function StatusesLegend() {
    return (
        <div className="flex w-full justify-center items-center flex-wrap gap-5">
        {statuses.map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
            <span
                className={`w-4 h-4 rounded-full ${status.color} `}
            />
            <span>{status.name}</span>
            </div>
        ))}
        </div>
    );
}