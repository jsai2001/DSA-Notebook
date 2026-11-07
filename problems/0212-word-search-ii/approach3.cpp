#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> findWords(std::vector<std::vector<char>>& board, std::vector<std::string>& words) {
        Node* root = new Node(); // a trie of all the words // @viz init
        for (const std::string& w : words) { // @viz init
            Node* node = root; // @viz init
            for (char ch : w) { // @viz init
                Node*& next = node->child[ch - 'a']; // @viz init
                if (!next) { next = new Node(); ++node->kids; } // @viz init
                node = next; // @viz init
            }
            node->word = &w; // the word that ends at this node // @viz init
        }
        for (int r = 0; r < (int)board.size(); ++r) // one DFS from every cell finds all the words at once // @viz start
            for (int c = 0; c < (int)board[0].size(); ++c) // @viz start
                dfs(board, r, c, root); // @viz start
        return res; // @viz return
    }
private:
    struct Node {
        Node* child[26] = {};
        int kids = 0; // children in use
        const std::string* word = nullptr;
    };
    std::vector<std::string> res;
    void dfs(std::vector<std::vector<char>>& board, int r, int c, Node* node) { // node = the trie node for the letters on the path so far // @viz dfs
        if (r < 0 || r >= (int)board.size() || c < 0 || c >= (int)board[0].size()) return; // @viz dfs
        char ch = board[r][c]; // @viz dfs
        if (ch == '#' || !node->child[ch - 'a']) return; // no word goes on with this letter, or the cell is on the path // @viz stop
        Node* next = node->child[ch - 'a']; // @viz step
        if (next->word) { // the path spells a whole word // @viz found
            res.push_back(*next->word); // @viz found
            next->word = nullptr; // clear it, so it's reported once // @viz found
        }
        board[r][c] = '#'; // @viz step
        dfs(board, r + 1, c, next); // @viz step
        dfs(board, r - 1, c, next); // @viz step
        dfs(board, r, c + 1, next); // @viz step
        dfs(board, r, c - 1, next); // @viz step
        board[r][c] = ch; // @viz back
        if (!next->word && next->kids == 0) { // nothing left below: every word through here is found // @viz prune
            node->child[ch - 'a'] = nullptr; // cut the branch, so no later path walks it again // @viz prune
            --node->kids; // @viz prune
        }
    }
};
