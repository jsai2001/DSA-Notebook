import java.util.ArrayDeque;
import java.util.Deque;
class Solution {
    public int trap(int[] height) {
        Deque<Integer> stack = new ArrayDeque<>(); // indices of bars whose heights go down from bottom to top // @viz init
        int total = 0; // @viz init
        for (int i = 0; i < height.length; i++) { // @viz loop
            while (!stack.isEmpty() && height[stack.peek()] < height[i]) { // bar i is taller than the top: water can sit on the top bar // @viz pop
                int bottom = stack.pop(); // @viz pop
                if (stack.isEmpty()) break; // no wall on the left, so that water would run off // @viz no-left
                int left = stack.peek(); // @viz fill
                int width = i - left - 1; // @viz fill
                int depth = Math.min(height[left], height[i]) - height[bottom]; // @viz fill
                total += width * depth; // one horizontal layer of water between left and i // @viz fill
            }
            stack.push(i); // @viz push
        }
        return total; // @viz return
    }
}
