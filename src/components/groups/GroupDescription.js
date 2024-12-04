import { SectionHeader } from "../header/Header"
export default function GroupDescription({ description }) {
    return (
        <div className="group-content">
            <SectionHeader text="Description" />
            <div className="group-section-container">
                <p>{description}</p>
            </div>
        </div>
    )
}