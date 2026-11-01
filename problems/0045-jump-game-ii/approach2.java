import java.util.ArrayDeque;
import java.util.Deque;
class Solution {
    public int jump(int[] nums) {
        int n = nums.length;
        int[] dist = new int[n]; // dist[i]: jumps used to reach i // @viz init
        Deque<Integer> queue = new ArrayDeque<>(); // @viz init
        queue.add(0); // @viz init
        int reached = 0; // the furthest index already in the queue // @viz init
        while (!queue.isEmpty()) { // @viz pop
            int i = queue.poll(); // indices come out in order of jumps used // @viz pop
            if (i == n - 1) return dist[i]; // the first time the last index comes out is the fewest jumps // @viz done
            for (int j = reached + 1; j <= Math.min(n - 1, i + nums[i]); j++) { // only indices nobody has queued yet // @viz push
                dist[j] = dist[i] + 1; // @viz push
                queue.add(j); // @viz push
            }
            reached = Math.max(reached, i + nums[i]); // @viz push
        }
        return -1; // not reached: the problem guarantees this can't happen
    }
}
