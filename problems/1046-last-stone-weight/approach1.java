import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
class Solution {
    public int lastStoneWeight(int[] stones) {
        List<Integer> s = new ArrayList<>(); // @viz init
        for (int w : stones) s.add(w); // @viz init
        while (s.size() > 1) { // @viz loop
            Collections.sort(s); // the two heaviest are now at the end // @viz sort
            int y = s.remove(s.size() - 1); // heaviest // @viz take
            int x = s.remove(s.size() - 1); // second heaviest // @viz take
            if (y != x) s.add(y - x); // equal stones both break; otherwise y - x is left // @viz smash
        }
        return s.isEmpty() ? 0 : s.get(0); // @viz return
    }
}
