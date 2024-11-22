import { FC, MouseEvent } from "react";

// Assets
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

// Types
import { TableFoooterBtnI, TableI } from "../types";

const Table: FC<TableI> = ({
    columns,
    data,
    isDarkMode,
    totalRecords,
    deleteHandler,
    currentPage,
    previousPageHandler,
    nextPageHandler,
    rowHandler,
}) => {
    const canGoPrevious: boolean = currentPage !== 1;
    const canGoNext: boolean = totalRecords / 5 > currentPage;

    function onDelete(
        event: MouseEvent<HTMLButtonElement>,
        rowData: any
    ): void {
        event.stopPropagation();
        event.preventDefault();
        deleteHandler && deleteHandler(rowData);
    }

    const FooterButton = ({
        onClick,
        disabled,
        children,
    }: TableFoooterBtnI) => (
        <button
            disabled={disabled}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                onClick();
            }}
            className={`transition-all duration-200  flex justify-center items-center p-2 rounded-lg 
                ${
                    disabled
                        ? "cursor-not-allowed bg-pink-transparent-2"
                        : "hover:bg-pink-transparent-2 bg-pink-transparent"
                }
            `}
        >
            {children}
        </button>
    );

    return (
        <div>
            <table className="w-full">
                <thead className="bg-pink-transparent w-full">
                    <tr>
                        {columns.map((column) => (
                            <th className="py-3" key={column.key}>
                                <span className="text-primary text-lg">
                                    {column.value}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData: any) => (
                        <tr
                            key={rowData.id}
                            onClick={() => rowHandler(rowData)}
                            className="bg-pink-transparent-2 hover:bg-pink-transparent transition-all duration-200 cursor-pointer"
                        >
                            {columns.map((column) => {
                                const isActionColumn = column.key === "actions";
                                const isImageColumn = column.key === "image";

                                return isActionColumn && deleteHandler ? (
                                    <td className="py-3" key={column.key}>
                                        <div className="flex justify-center items-center w-full h-full">
                                            <IconButton
                                                onClick={(
                                                    event: MouseEvent<HTMLButtonElement>
                                                ) => onDelete(event, rowData)}
                                            >
                                                <DeleteIcon className="text-2xl text-primary" />
                                            </IconButton>
                                        </div>
                                    </td>
                                ) : isImageColumn ? (
                                    <td
                                        className="p-10 mobile:py-5"
                                        key={column.key}
                                    >
                                        <div className="bg-pink-transparent w-40 flex justify-center items-center p-5 rounded-xl">
                                            <img
                                                src={`https://koghcmfdnzuxvzfmbzop.supabase.co/storage/v1/object/public/images/${rowData.id}`}
                                                alt="Impossibile visualizzare l'immagine."
                                                className="object-contain w-40"
                                            />
                                        </div>
                                    </td>
                                ) : (
                                    <td
                                        key={column.key}
                                        className="py-3 text-center"
                                    >
                                        <span
                                            className={`text-md transition-all duration-200
                                            ${
                                                isDarkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }
                                        `}
                                        >
                                            {rowData[column.key]}
                                        </span>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full bg-pink-transparent p-5 rounded-bl-lg rounded-br-lg flex justify-between">
                <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
                    Totale: {totalRecords}
                </span>
                <div className="flex flex-row gap-5">
                    <FooterButton
                        disabled={!canGoPrevious}
                        onClick={() => previousPageHandler()}
                    >
                        <ArrowLeftIcon
                            className={`text-2xl
                                ${
                                    !canGoPrevious
                                        ? "text-pink-transparent"
                                        : "text-primary"
                                }
                            `}
                        />
                    </FooterButton>
                    <FooterButton
                        disabled={!canGoNext}
                        onClick={() => nextPageHandler()}
                    >
                        <ArrowRightIcon
                            className={`text-2xl
                                ${
                                    !canGoNext
                                        ? "text-pink-transparent"
                                        : "text-primary"
                                }
                            `}
                        />
                    </FooterButton>
                </div>
            </div>
        </div>
    );
};

export default Table;
