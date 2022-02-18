import { createClient } from "@supabase/supabase-js";
import type { TaskType } from "src/lib/Datetime";
import { getDate, getDateEnd } from "src/lib/Datetime";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error("環境変数が未定義 : env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!SUPABASE_KEY) {
  throw new Error("環境変数が未定義 : env.NEXT_PUBLIC_SUPABASE_KEY");
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export type TodoType = {
  id: number;
  uid: string;
  inserted: Date;
  task: string;
  deadline: Date | null;
  isComplete: boolean;
};

export const addTodo = async (
  uid: string,
  task: string,
  taskType: TaskType
) => {
  const deadline = taskType == "other" ? null : getDate(taskType);
  const { error } = await client
    .from("todos")
    .insert([{ uid: uid, task: task, deadline: deadline }]);
  if (error) {
    return false;
  } else {
    return true;
  }
};

export const getTodo = async (taskType: TaskType) => {
  if (taskType != "other") {
    const start = getDate(taskType);
    const end = getDateEnd(taskType);
    const { data, error } = await client
      .from<TodoType>("todos")
      .select("*")
      .gte("deadline", start.toISOString())
      .lte("deadline", end.toISOString());
    if (error || !data) {
      return [];
    } else {
      return data;
    }
  } else {
    const { data, error } = await client
      .from<TodoType>("todos")
      .select("*")
      .is("deadline", null);
    if (error || !data) {
      return [];
    } else {
      return data;
    }
  }
};

export const editTodo = async (id: string, task: string) => {
  const { error } = await client
    .from("todos")
    .update({ task: task })
    .eq("id", id);

  if (error) {
    return false;
  } else {
    return true;
  }
};
