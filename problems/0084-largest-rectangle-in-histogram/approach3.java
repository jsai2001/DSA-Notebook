import java.util.ArrayDeque;
import java.util.Deque;
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length; // @viz init
        Deque<Integer> stack = new ArrayDeque<>(); // indices; their heights go up from bottom to top // @viz init
        int best = 0; // @viz init
        for (int i = 0; i <= n; i++) { // i == n is a bar of height 0 that empties the stack // @viz loop
            int h = i < n ? heights[i] : 0; // @viz loop
            while (!stack.isEmpty() && heights[stack.peek()] >= h) { // bar i is a right wall for the top bar // @viz pop
                int top = heights[stack.pop()]; // @viz pop
                int left = stack.isEmpty() ? -1 : stack.peek(); // the bar below it is shorter: its left wall // @viz width
                best = Math.max(best, top * (i - left - 1)); // it spans left+1 .. i-1 // @viz width
            }
            stack.push(i); // @viz push
        }
        return best; // @viz return
    }
}
