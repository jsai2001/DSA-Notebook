import java.util.*;

class Solution {
    public int evalRPN(String[] tokens) {
        List<Long> val = new ArrayList<>(); // @viz init
        List<Character> op = new ArrayList<>(); // the operator, or ' ' for a number // @viz init
        for (String t : tokens) { // @viz init
            boolean isOp = t.length() == 1 && "+-*/".indexOf(t.charAt(0)) >= 0; // @viz init
            op.add(isOp ? t.charAt(0) : ' '); // @viz init
            val.add(isOp ? 0L : Long.parseLong(t)); // @viz init
        }
        while (val.size() > 1) { // @viz find
            int i = 0; // @viz find
            while (op.get(i) == ' ') i++; // find the first operator, from the start each time // @viz find
            long a = val.get(i - 2), b = val.get(i - 1), r; // the two numbers just before it // @viz apply
            switch (op.get(i)) { // @viz apply
                case '+': r = a + b; break; // @viz apply
                case '-': r = a - b; break; // @viz apply
                case '*': r = a * b; break; // @viz apply
                default: r = a / b; // Java division already truncates toward zero // @viz apply
            }
            val.set(i - 2, r); // three items become one // @viz replace
            op.set(i - 2, ' '); // @viz replace
            for (int k = 0; k < 2; k++) { val.remove(i - 1); op.remove(i - 1); } // @viz replace
        }
        return (int) (long) val.get(0); // @viz return
    }
}
