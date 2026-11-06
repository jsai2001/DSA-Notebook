import java.util.Collections;
import java.util.PriorityQueue;
class Solution {
    public int lastStoneWeight(int[] stones) {
        // Java's PriorityQueue is a min-heap; reverseOrder() turns it into a max-heap.
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder()); // @viz init
        for (int w : stones) heap.add(w); // @viz init
        while (heap.size() > 1) { // @viz loop
            int y = heap.poll(); // heaviest // @viz take
            int x = heap.poll(); // second heaviest // @viz take
            if (y != x) heap.add(y - x); // equal stones both break; otherwise y - x goes back in // @viz smash
        }
        return heap.isEmpty() ? 0 : heap.peek(); // @viz return
    }
}
