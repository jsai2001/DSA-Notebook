import java.util.*;

class MinStack {
    private final ArrayDeque<int[]> stack = new ArrayDeque<>(); // {value, smallest value at or below it} // @viz init

    public MinStack() {} // @viz init

    public void push(int val) {
        int low = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]); // @viz push
        stack.push(new int[] {val, low}); // each entry remembers the minimum under it // @viz push
    }

    public void pop() { stack.pop(); } // the entries below still have the right minimum // @viz pop

    public int top() { return stack.peek()[0]; } // @viz top

    public int getMin() { return stack.peek()[1]; } // O(1) // @viz min
}
