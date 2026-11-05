import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length; // @viz init
        int[] left = new int[n]; // left[i]: nearest bar to the left that is shorter than bar i (-1 = none) // @viz init
        int[] right = new int[n]; // right[i]: nearest shorter bar to the right (n = none) // @viz init
        Arrays.fill(right, n); // @viz init
        Deque<Integer> stack = new ArrayDeque<>(); // indices; their heights go up from bottom to top // @viz init
        for (int i = 0; i < n; i++) { // @viz leftpass
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) // not shorter: can't be anyone's left wall // @viz leftpass
                stack.pop(); // @viz leftpass
            left[i] = stack.isEmpty() ? -1 : stack.peek(); // @viz leftpass
            stack.push(i); // @viz leftpass
        }
        stack.clear(); // @viz rightpass
        for (int i = n - 1; i >= 0; i--) { // the same, from the right // @viz rightpass
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) // @viz rightpass
                stack.pop(); // @viz rightpass
            right[i] = stack.isEmpty() ? n : stack.peek(); // @viz rightpass
            stack.push(i); // @viz rightpass
        }
        int best = 0; // @viz area
        for (int i = 0; i < n; i++) // the widest rectangle as tall as bar i spans left[i]+1 .. right[i]-1 // @viz area
            best = Math.max(best, heights[i] * (right[i] - left[i] - 1)); // @viz area
        return best; // @viz return
    }
}
