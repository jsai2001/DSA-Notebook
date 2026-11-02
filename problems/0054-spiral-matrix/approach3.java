import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int[][] rest = matrix; // never changed, only replaced by rotated copies // @viz init
        List<Integer> result = new ArrayList<>(); // @viz init
        while (rest.length > 0) { // @viz peel
            for (int x : rest[0]) result.add(x); // take the whole first row // @viz peel
            int rows = rest.length - 1, cols = rest[0].length; // what's left: rows 1..end // @viz peel
            if (rows == 0) break; // @viz peel
            // turn what's left a quarter counter-clockwise: its right column becomes the first row
            int[][] turned = new int[cols][rows]; // @viz rotate
            for (int i = 0; i < cols; i++) // @viz rotate
                for (int j = 0; j < rows; j++) turned[i][j] = rest[j + 1][cols - 1 - i]; // @viz rotate
            rest = turned; // @viz rotate
        }
        return result; // @viz return
    }
}
