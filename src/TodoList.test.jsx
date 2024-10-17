import TodoList from "./TodoList";
import { test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

//Lähteenä: https://testing-library.com/

test("add todo and clear", async () => {
    render(<TodoList />);
    const descInput = screen.getByLabelText("Description");
    const prioSelect = screen.getByLabelText("Priority");
    const dateInput = screen.getByLabelText("Date");

    fireEvent.change(descInput, { target : { value : "Walk the dog"}});

    fireEvent.mouseDown(prioSelect);
    const highOption = await screen.getByRole("option", { name : "High"});
    fireEvent.click(highOption);
    expect(highOption).toBeInTheDocument();
    

    fireEvent.change(dateInput, { target : { value : "10/08/2024"}});

    const button = screen.getByText("Add");
    fireEvent.click(button);

    expect(screen.getByText(/walk the dog/i)).toBeInTheDocument();

    expect(screen.getByText("8.10.2024")).toBeInTheDocument();
    
    const highElement = screen.getByRole('gridcell', { name: /high/i });
    expect(highElement).toBeInTheDocument();

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);
    expect(screen.queryByText(/walk the dog/i)).toBeNull();


})