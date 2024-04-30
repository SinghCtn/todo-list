import { connect } from "@/dbconfig/dbconfig";
import Todo from "@/model/taskModel";
import { NextResponse } from "next/server";

connect();

export async function DELETE(request: any, content: any) {
  try {
    const taskId = content.params.id;

    const deleteTask = await Todo.findByIdAndDelete({ _id: taskId });

    return NextResponse.json({ message: "task deleted successfuly" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: any,
  { params }: { params: { id: string } }
) {
  try {
    const { done } = await request.json();

    const updated = await Todo.findByIdAndUpdate(params.id, {
      $set: { done: done },
    });

    return NextResponse.json({ status: "Success", data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
