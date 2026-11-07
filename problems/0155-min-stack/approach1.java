import java.util.*;

class MinStack {
    private final ArrayList<Integer> stack = new ArrayList<>(); // @viz init

    public MinStack() {} // @viz init

    public void push(int val) { stack.add(val); } // @viz push

    public void pop() { stack.remove(stack.size() - 1); } // @viz pop

    public int top() { return stack.get(stack.size() - 1); } // @viz top

    public int getMin() {
        int best = stack.get(0); // @viz min
        for (int x : stack) { // look at everything: O(n) // @viz min
            if (x < best) best = x; // @viz min
        }
        return best; // @viz min
    }
}
