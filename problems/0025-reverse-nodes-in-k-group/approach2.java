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
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode node = head; // @viz check
        for (int i = 0; i < k; i++) { // is there a whole group of k nodes? // @viz check
            if (node == null) return head; // fewer than k left: they stay as they are // @viz short
            node = node.next; // @viz check
        }
        // node is now the first node after this group
        ListNode prev = reverseKGroup(node, k); // handle the rest first; this group will point to its answer // @viz recurse
        ListNode cur = head; // @viz flip
        while (cur != node) { // reverse this group onto the handled rest // @viz flip
            ListNode nxt = cur.next; // @viz flip
            cur.next = prev; // @viz flip
            prev = cur; // @viz flip
            cur = nxt; // @viz flip
        }
        return prev; // the group's old last node is now its first // @viz return
    }
}
