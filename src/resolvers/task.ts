import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "./../entities/Task";

@Resolver()
export class TaskResolver {

    @Query(() => [Task])
    async tasks(): Promise<Task[]> {
        return Task.find();
    }

    @Mutation(() => Task)
    createTask(
        @Arg("title", () => String) title: string,
        @Arg("description", () => String) description: string
    ): Promise<Task> {
        return Task.create({ title, description }).save();
    }

    //   @Query(()=>Task,{nullable:true})
    //   async task(@Arg("id",()=>Int)id:number):Promise <Task | undefined>{
    //     return Task.findOne({ id });
    //   }

    @Query(() => Task, { nullable: true })
    async task(@Arg("id", () => Int) id: any): Promise<any> {
        return Task.findOneBy({ id: id });
    }

    @Mutation(() => Boolean)
    async deleteTask(@Arg("id", () => Int) id: number): Promise<boolean> {
        if (await Task.findOneBy({ id: id })) {
            await Task.delete(id);
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => Task, { nullable: true })
    async updateTask(
        @Arg("title", () => String, { nullable: true }) title: string,
        @Arg("description", () => String, { nullable: true }) description: string,
        @Arg("id", () => Int) id: number
    ): Promise<Task | null> {
        const task = await Task.findOneBy({ id: id });
        if (!task) {
            return null;
        }
        if (typeof title !== "undefined") {
            await Task.update({ id }, { title });
        }

        if (typeof description !== "undefined") {
            await Task.update({ id }, { description });
        }
        return task;
    }




}
