import java.util.ArrayDeque;
import java.util.Collections;
import java.util.Deque;
import java.util.PriorityQueue;
class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26]; // @viz init
        for (char t : tasks) counts[t - 'A']++; // @viz init
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder()); // a max-heap of counts // @viz init
        for (int c : counts) if (c > 0) heap.add(c); // @viz init
        Deque<int[]> waiting = new ArrayDeque<>(); // {count left, time it may run again}, in the order they ran // @viz init
        int time = 0; // @viz init
        while (!heap.isEmpty() || !waiting.isEmpty()) { // @viz tick
            time++; // @viz tick
            if (!heap.isEmpty()) { // run the task with the most left // @viz run
                int c = heap.poll() - 1; // @viz run
                if (c > 0) waiting.add(new int[] {c, time + n}); // some left: it waits n units // @viz run
            }
            if (!waiting.isEmpty() && waiting.peek()[1] == time) // its wait is over: back in the heap // @viz back
                heap.add(waiting.poll()[0]); // @viz back
        }
        return time; // @viz return
    }
}
