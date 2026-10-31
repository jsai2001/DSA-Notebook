import java.util.ArrayList;
import java.util.List;
class Solution {
    private List<String> result;
    private StringBuilder path;
    public List<String> generateParenthesis(int n) {
        result = new ArrayList<>(); // @viz init
        path = new StringBuilder(); // @viz init
        backtrack(n, 0, 0); // @viz start
        return result; // @viz return
    }
    private void backtrack(int n, int opened, int closed) { // opened / closed: how many '(' and ')' are in path // @viz call
        if (path.length() == 2 * n) { // all n pairs placed // @viz done
            result.add(path.toString()); // @viz done
            return; // @viz done
        }
        if (opened < n) { // an '(' is still left to place // @viz open
            path.append('('); // @viz open
            backtrack(n, opened + 1, closed); // @viz open
            path.deleteCharAt(path.length() - 1); // undo, so ')' can be tried here // @viz undo-open
        }
        if (closed < opened) { // ')' only when some '(' is still unmatched // @viz close
            path.append(')'); // @viz close
            backtrack(n, opened, closed + 1); // @viz close
            path.deleteCharAt(path.length() - 1); // @viz undo-close
        }
    }
}
