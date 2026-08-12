export type ProjectFilterType = "all" | "fullstack" | "frontend" | "backend";

export interface SegmentedControlProps {
    activeFilter: ProjectFilterType;
    onFilterChange: (filter: ProjectFilterType) => void;
}

export interface ProjectFilterOption {
    label: string;
    value: ProjectFilterType;
}
