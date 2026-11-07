class Solution {
    private int pos;

    public int evalRPN(String[] tokens) {
        pos = tokens.length - 1; // read from the end // @viz init
        return (int) ev(tokens); // @viz init
    }

    private long ev(String[] tokens) {
        String t = tokens[pos--]; // @viz read
        if (t.length() > 1 || "+-*/".indexOf(t.charAt(0)) < 0) { // a number ("-3" is a number) // @viz num
            return Long.parseLong(t); // @viz num
        }
        long b = ev(tokens); // the right operand comes first when reading backwards // @viz right
        long a = ev(tokens); // then the left one // @viz left
        switch (t.charAt(0)) { // @viz apply
            case '+': return a + b; // @viz apply
            case '-': return a - b; // @viz apply
            case '*': return a * b; // @viz apply
            default: return a / b; // truncates toward zero // @viz apply
        }
    }
}
