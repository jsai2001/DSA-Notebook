/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;
    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null; // @viz init
        for (Node cur = head; cur != null; cur = cur.next.next) { // step 1: A -> B becomes A -> A' -> B -> B' // @viz weave
            Node copy = new Node(cur.val); // @viz weave
            copy.next = cur.next; // @viz weave
            cur.next = copy; // @viz weave
        }
        for (Node cur = head; cur != null; cur = cur.next.next) { // step 2: the copy of X.random sits right after X.random // @viz random
            if (cur.random != null) cur.next.random = cur.random.next; // random can be null // @viz random
        }
        Node newHead = head.next; // @viz split
        for (Node cur = head; cur != null; cur = cur.next) { // step 3: pull the copies out and put the original back // @viz split
            Node copy = cur.next; // @viz split
            cur.next = copy.next; // @viz split
            copy.next = copy.next != null ? copy.next.next : null; // @viz split
        }
        return newHead; // @viz return
    }
}
