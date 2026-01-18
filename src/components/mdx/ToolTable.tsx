import { Locale } from "@/lib/i18n";
import toolTables from "@/data/tool-tables.json";

interface ToolTableProps {
    id: string;
    lang?: Locale;
}

type LocalizedString = { en: string; zh: string };

type ColumnDef = {
    key: string;
    label: LocalizedString;
    width?: string;
};

type RowDef = Record<string, LocalizedString>;

type TableDef = {
    columns: ColumnDef[];
    rows: RowDef[];
};

export function ToolTable({ id, lang }: ToolTableProps) {
    const locale = lang || 'en';
    const tableData = (toolTables as Record<string, TableDef>)[id];

    if (!tableData) {
        return (
            <div className="p-4 my-8 bg-red-900/20 text-red-500 border border-red-500/50 rounded-lg text-sm font-mono text-center">
                [SYSTEM_ERROR] Table ID &quot;{id}&quot; not found in database.
            </div>
        );
    }

    return (
        <div className="my-8 rounded-lg border border-white/10 bg-neutral-900/40 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-900 border-b border-white/10">
                            {tableData.columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`p-4 text-xs font-bold text-yellow-500 uppercase tracking-wider border-r border-white/5 last:border-r-0 ${col.width || ''}`}
                                >
                                    {col.label[locale] || col.label.en}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {tableData.rows.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                {tableData.columns.map((col) => {
                                    const cellData = row[col.key];
                                    const cellContent = cellData ? (cellData[locale] || cellData.en) : '-';

                                    return (
                                        <td
                                            key={col.key}
                                            className="p-4 text-sm text-neutral-300 border-r border-white/5 last:border-r-0 align-top leading-relaxed"
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: cellContent }} />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-2 bg-neutral-950 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-neutral-600 uppercase">
                <span>Table_ID: {id}</span>
                <span>Entries: {tableData.rows.length}</span>
            </div>
        </div>
    );
}
