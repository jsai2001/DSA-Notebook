class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length; // @viz init
        int[] ans = new int[n]; // @viz init
        int[] stack = new int[n]; // days still waiting for a warmer day (an array is faster than a Deque) // @viz init
        int top = 0; // @viz init
        for (int i = 0; i < n; i++) { // @viz day
            while (top > 0 && temperatures[stack[top - 1]] < temperatures[i]) { // today is warmer than the day on top // @viz pop
                int j = stack[--top]; // @viz pop
                ans[j] = i - j; // its wait is over // @viz pop
            }
            stack[top++] = i; // today waits too // @viz push
        }
        return ans; // days left on the stack never get a warmer day: 0 // @viz return
    }
}
