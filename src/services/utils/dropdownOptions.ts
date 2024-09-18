
export const generateOptions = (data: any, labelKey: string, valueKey: string) => {
    return data?.map((item: any) => ({
        value: item[valueKey],
        label: item[labelKey],
    })) || [];
};

// Usage:
