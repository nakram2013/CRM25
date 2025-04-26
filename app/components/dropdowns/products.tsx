import { apiService } from "~/api/ApiService";
import type { DropdownListItem } from "./schema";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const Products: React.FC<any> = ({ children, ...rest }) => {
    const [options, setOptions] = useState<DropdownListItem[]>([]);
    const fetchData = async () => {
        try {
            const response = await apiService.dropdownRequest('/api/Dropdowns/Project'); // Assuming this returns an array of options
            setOptions(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching dropdown options:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Select {...rest}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Project / Product" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Project / Product</SelectLabel>
                    {children}
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option.value.toString()}>
                            {option.text}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default Products;