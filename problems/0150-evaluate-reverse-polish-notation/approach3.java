import java.util.*;

class Solution {
    public int evalRPN(String[] tokens) {
        ArrayDeque<Long> stack = new ArrayDeque<>(); // @viz init
        for (String t : tokens) { // @viz loop
            if (t.length() > 1 || "+-*/".indexOf(t.charAt(0)) < 0) { // a number ("-3" is a number) // @viz push
                stack.push(Long.parseLong(t)); // @viz push
                continue; // @viz push
            }
            long b = stack.pop(); // the top is the RIGHT operand // @viz pop
            long a = stack.pop(); // @viz pop
            switch (t.charAt(0)) { // @viz apply
                case '+': stack.push(a + b); break; // @viz apply
                case '-': stack.push(a - b); break; // @viz apply
                case '*': stack.push(a * b); break; // @viz apply
                default: stack.push(a / b); // truncates toward zero // @viz apply
            }
        }
        return (int) (long) stack.peek(); // @viz return
    }
}
