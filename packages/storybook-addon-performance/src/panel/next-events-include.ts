import { MachineEvents } from './machine';

// A little wrapping function that improves type safety
export default function nextEventsInclude(name: MachineEvents['type'], events: string[]): boolean {
  return events.includes(name);
}
