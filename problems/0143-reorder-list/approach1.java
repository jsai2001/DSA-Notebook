/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
import java.util.*;

class Solution {
    public void reorderList(ListNode head) {
        List<ListNode> nodes = new ArrayList<>(); // @viz init
        for (ListNode p = head; p != null; p = p.next) { // copy the nodes (not the values) into an array // @viz copy
            nodes.add(p); // @viz copy
        }
        int i = 0, j = nodes.size() - 1; // @viz link
        while (i < j) { // take one from the front, then one from the back // @viz link
            nodes.get(i).next = nodes.get(j); // @viz link
            if (++i == j) break; // odd length: they met in the middle // @viz link
            nodes.get(j).next = nodes.get(i); // @viz link
            j--; // @viz link
        }
        nodes.get(i).next = null; // the new last node: cut the old link, or it loops // @viz cut
    }
}
