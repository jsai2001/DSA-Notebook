/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include <vector>
class Solution {
public:
    void reorderList(ListNode* head) {
        std::vector<ListNode*> nodes; // @viz init
        for (ListNode* p = head; p; p = p->next) { // copy the nodes (not the values) into an array // @viz copy
            nodes.push_back(p); // @viz copy
        }
        int i = 0, j = static_cast<int>(nodes.size()) - 1; // @viz link
        while (i < j) { // take one from the front, then one from the back // @viz link
            nodes[i]->next = nodes[j]; // @viz link
            if (++i == j) break; // odd length: they met in the middle // @viz link
            nodes[j]->next = nodes[i]; // @viz link
            --j; // @viz link
        }
        nodes[i]->next = nullptr; // the new last node: cut the old link, or it loops // @viz cut
    }
};
