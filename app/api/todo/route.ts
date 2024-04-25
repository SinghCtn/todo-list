import { connect } from "@/dbconfig/dbconfig";
import Todo from "@/model/taskModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { todoTask } = reqBody;
    console.log(reqBody);

    const task = await Todo.findOne({ todoTask });

    if (task) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newTask = new Todo({
      todoTask,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);

    return NextResponse.json({
      message: "task registerd",
      success: true,
      savedTask,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
