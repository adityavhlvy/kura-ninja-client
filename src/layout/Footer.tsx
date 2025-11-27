import { VscSourceControl, VscCheck, VscBell } from "react-icons/vsc";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-content text-xs flex items-center justify-between px-2 py-1 select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded">
                    <VscSourceControl />
                    <span>main*</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded">
                    <VscCheck />
                    <span>0 errors</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded">
                    <span>Ln 12, Col 34</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded">
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded">
                    <VscBell />
                </div>
            </div>
        </footer>
    );
}
