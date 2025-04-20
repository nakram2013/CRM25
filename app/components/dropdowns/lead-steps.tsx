import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const LeadSteps: React.FC<any> = ({ children, ...rest }) => {
    return (
        <Select {...rest}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Step" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Step</SelectLabel>
                    {children}
                    {[{ value: 1, label: "Hold" }, { value: 2, label: "Cold" }, { value: 3, label: "Cool" },
                    { value: 4, label: "Warm" }, { value: 5, label: "Hot" }, { value: 6, label: "Visited" }, { value: 7, label: "Finalized" },].map((opt) => (
                        <SelectItem key={opt.value} value={opt.value.toString()}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LeadSteps;