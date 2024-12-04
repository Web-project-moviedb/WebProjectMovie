import { SectionHeader } from "../header/Header"
export default function GroupDescription({ description }) {
    return (
        <div className="group-content">
            <SectionHeader text="Description" />
            <p>{description}</p>
        </div>
    )
}