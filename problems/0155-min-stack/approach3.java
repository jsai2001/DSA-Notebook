import java.util.*;

class MinStack {
    private final ArrayDeque<Integer> stack = new ArrayDeque<>(); // @viz init
    private final ArrayDeque<Integer> mins = new ArrayDeque<>(); // the minimum so far, pushed only when it changes (or repeats) // @viz init

    public MinStack() {} // @viz init

    public void push(int val) {
        stack.push(val); // @viz push
        if (mins.isEmpty() || val <= mins.peek()) mins.push(val); // <=, not <: a repeated minimum is pushed again // @viz push
    }

    public void pop() {
        // equals, not ==: these are Integer objects, and == compares identity outside -128..127
        if (stack.pop().equals(mins.peek())) mins.pop(); // removing the current minimum // @viz pop
    }

    public int top() { return stack.peek(); } // @viz top

    public int getMin() { return mins.peek(); } // O(1) // @viz min
}
